"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snowflake = void 0;
var SDK = require("snowflake-sdk");
var Statement_1 = require("./Statement");
var Snowflake = /** @class */ (function () {
    /**
     * Creates a new Snowflake instance.
     *
     * @param connectionOptions The Snowflake connection options
     * @param loggingOptions Controls query logging and SDK-level logging
     * @param configureOptions Additional configuration options
     */
    function Snowflake(connectionOptions, loggingOptions, configureOptions) {
        if (loggingOptions === void 0) { loggingOptions = {}; }
        if (loggingOptions && loggingOptions.logLevel) {
            SDK.configure({ logLevel: loggingOptions.logLevel });
        }
        this.logSql = (loggingOptions && loggingOptions.logSql) || null;
        // For backward compatibility, configureOptions is allowed to be a boolean, but it’s
        // ignored. The new default settings accomplish the same thing as the old
        // `insecureConnect` boolean.
        if (typeof configureOptions === 'boolean') {
            console.warn('[snowflake-promise] the insecureConnect boolean argument is deprecated; ' +
                'please remove it or use the ocspFailOpen configure option');
        }
        else if (typeof configureOptions === 'object') {
            SDK.configure(configureOptions);
        }
        this.sdk_connection = SDK.createConnection(connectionOptions);
    }
    Object.defineProperty(Snowflake.prototype, "id", {
        /** the connection id */
        get: function () {
            return this.sdk_connection.getId();
        },
        enumerable: false,
        configurable: true
    });
    /** Establishes a connection if we aren't in a fatal state. */
    Snowflake.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sdk_connection.connect(function (err) {
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
     * Immediately terminates the connection without waiting for currently
     * executing statements to complete.
     */
    Snowflake.prototype.destroy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sdk_connection.destroy(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    /** Create a Statement. */
    Snowflake.prototype.createStatement = function (options) {
        return new Statement_1.Statement(this.sdk_connection, options, this.logSql);
    };
    /** A convenience function to execute a SQL statement and return the resulting rows. */
    Snowflake.prototype.execute = function (sqlText, binds) {
        var stmt = this.createStatement({ sqlText: sqlText, binds: binds });
        stmt.execute();
        return stmt.getRows();
    };
    return Snowflake;
}());
exports.Snowflake = Snowflake;
//# sourceMappingURL=Snowflake.js.map