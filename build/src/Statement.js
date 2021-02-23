"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
var StatementAlreadyExecutedError_1 = require("./types/StatementAlreadyExecutedError");
var StatementNotExecutedError_1 = require("./types/StatementNotExecutedError");
var Statement = /** @class */ (function () {
    /**
     * @param connection the connection object from the SDK
     * @param executeOptions the Statement configuration, including the sqlText
     * @param logSql function to use to log SQL statements
     */
    function Statement(connection, executeOptions, logSql) {
        if (logSql === void 0) { logSql = null; }
        this.connection = connection;
        this.executeOptions = executeOptions;
        this.logSql = logSql;
        this.rows = null;
        this.stmt = null;
        this.executePromise = null;
    }
    /**
     * Execute this Statement.
     * @throws if the statement was previously executed or an error occurs
     * @return Promise<void>
     */
    Statement.prototype.execute = function () {
        var _this = this;
        if (this.executePromise) {
            throw new StatementAlreadyExecutedError_1.StatementAlreadyExecutedError();
        }
        this.executePromise = new Promise(function (resolve, reject) {
            var startTime;
            _this.executeOptions['complete'] = function (err, stmt, rows) {
                var elapsed = Date.now() - startTime;
                if (err) {
                    reject(err);
                }
                if (_this.logSql) {
                    _this.log(elapsed);
                }
                _this.rows = rows;
                resolve();
            };
            startTime = Date.now();
            _this.stmt = _this.connection.execute(_this.executeOptions);
        });
        return this.executePromise;
    };
    /** Cancel a currently-executing Statement. */
    Statement.prototype.cancel = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.stmt.cancel(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    /**
     * Get the rows returned by the Statement.
     * @throws if the Statement was not in streaming mode
     */
    Statement.prototype.getRows = function () {
        var _this = this;
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.executePromise.then(function () { return _this.rows; });
    };
    /**
     * Stream the rows returned by the Statement.
     * @throws if the statement was in non-streaming mode
     */
    Statement.prototype.streamRows = function (options) {
        if (options === void 0) { options = {}; }
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.streamRows(options);
    };
    /** this statement's SQL text */
    Statement.prototype.getSqlText = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getSqlText();
    };
    /** the current status of this statement */
    Statement.prototype.getStatus = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getStatus();
    };
    /** the columns produced by this statement */
    Statement.prototype.getColumns = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getColumns();
    };
    /**
     * Given a column identifier, returns the corresponding column. The column
     * identifier can be either the column name (String) or the column index
     * (Number). If a column is specified and there is more than one column with
     * that name, the first column with the specified name will be returned.
     */
    Statement.prototype.getColumn = function (columnIdentifier) {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getColumn(columnIdentifier);
    };
    /** the number of rows returned by this statement */
    Statement.prototype.getNumRows = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getNumRows();
    };
    /** the number of rows updated by this statement */
    Statement.prototype.getNumUpdatedRows = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getNumUpdatedRows();
    };
    /**
     * Returns an object that contains information about the values of the
     * current warehouse, current database, etc., when this statement finished
     * executing.
     */
    Statement.prototype.getSessionState = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getSessionState();
    };
    /** the request id that was used when the statement was issued */
    Statement.prototype.getRequestId = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getRequestId();
    };
    /**
     * Returns the statement id generated by the server for this statement.
     * If the statement is still executing and we don't know the statement id
     * yet, this method will return undefined.
     */
    Statement.prototype.getStatementId = function () {
        if (!this.executePromise) {
            throw new StatementNotExecutedError_1.StatementNotExecutedError();
        }
        return this.stmt.getStatementId();
    };
    /** log execution details */
    Statement.prototype.log = function (elapsedTime) {
        var logMessage = 'Executed';
        var state = this.getSessionState();
        if (state) {
            logMessage += " (" + state.getCurrentDatabase() + "." + state.getCurrentSchema() + ")";
        }
        logMessage += ": " + this.getSqlText();
        if (logMessage[logMessage.length - 1] !== ';') {
            logMessage += ';';
        }
        if (this.executeOptions.binds) {
            logMessage += "  with binds: " + JSON.stringify(this.executeOptions.binds) + ";";
        }
        logMessage += "  Elapsed time: " + elapsedTime + "ms";
        this.logSql(logMessage);
    };
    return Statement;
}());
exports.Statement = Statement;
//# sourceMappingURL=Statement.js.map