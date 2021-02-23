"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementNotExecutedError = void 0;
var SnowflakeError_1 = require("./SnowflakeError");
var StatementNotExecutedError = /** @class */ (function (_super) {
    __extends(StatementNotExecutedError, _super);
    function StatementNotExecutedError() {
        return _super.call(this, 'Statement not executed yet - call the execute() method') || this;
    }
    return StatementNotExecutedError;
}(SnowflakeError_1.SnowflakeError));
exports.StatementNotExecutedError = StatementNotExecutedError;
//# sourceMappingURL=StatementNotExecutedError.js.map