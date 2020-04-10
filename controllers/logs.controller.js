const Log = require("../models/log.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const log = new Log({
    logName: req.body.logName,
    running: req.body.running,
    parentProject: req.params.projectId,
  });

  log
    .save()
    .then((log) => {
      if (log) {
        res.json(log);
      } else {
        throw createError(404, "Project not found");
      }
    })
    .catch(next);
};

module.exports.read = (req, res, next) => {
  Log.find({ parentProject: req.params.projectId })
    .then((logs) => {
      if (logs) {
        res.json(logs);
      } else {
        throw createError(404, "Logs not found");
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Log.findByIdAndUpdate(req.params.logId, req.body, { new: true })
    .then((log) => {
      if (log) {
        res.json(log);
      } else {
        throw createError(404, "Log not found");
      }
    })
    .catch(next);
};

module.exports.updateStatus = (req, res, next) => {
  Log.findByIdAndUpdate(
    req.params.logId,
    { finishedAt: new Date(), running: false },
    { new: true }
  )
    .then((log) => {
      if (log) {
        res.json(log);
      } else {
        throw createError(404, "Couldn't update the log");
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Log.findOneAndDelete(req.params.logId)
    .then((log) => {
      if (log) {
        res.status(204).json();
      } else {
        throw createError(404, "Log not found");
      }
    })
    .catch(next);
};
