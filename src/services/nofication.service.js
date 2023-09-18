const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const sendNotification = async (data, callback) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: 'Basic ' + config.oneSignal.restApiKey,
  };

  const options = {
    host: 'onesignal.com',
    port: 443,
    path: '/api/v1/notifications',
    method: 'POST',
    headers: headers,
  };

  const https = require('https');
  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      logger.info(JSON.parse(data));

      return callback(null, JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    return callback({
      message: e,
    });
  });

  req.write(JSON.stringify(data));
  req.end();
};

const sendNotificationToDevice = (device) => {
  var message = {
    app_id: config.oneSignal.appId,
    headings: { en: '🤑 Paiement accepté' },
    contents: {
      en: 'Sample Noti with English',
    },
    included_segments: ['included_player_ids'],
    include_player_ids: device,
    content_available: true,
    // small_icon: 'ic_notification_icon',
    data: {
      // eslint-disable-next-line quotes
      PushTitle: "Porc'Ivoire",
    },
  };
  sendNotification(message, (error, results) => {
    if (error) {
      console.log(error);
      throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Error occured while sending a notification');
    }
    return {
      message: 'Success',
      data: results,
    };
  });
};

module.exports = { sendNotificationToDevice };
