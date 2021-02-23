export interface ConnectionOptions {
    /**
     * Name of your Snowflake account as it appears in the URL for accessing the
     * web interface. For example, in https://abc123.snowflakecomputing.com,
     * abc123 is the account name.
     */
    account: string;
    /** Snowflake user login name to connect with. */
    username: string;
    /** Password for the user. */
    password: string;
    /**
     * Region for the user. Currently, only required for users connecting to the
     * following regions:
     *   US East: us-east-1
     *   EU (Frankfurt): eu-central-1
     */
    region?: string;
    /** The default database to use for the session after connecting. */
    database?: string;
    /** The default schema to use for the session after connecting. */
    schema?: string;
    /**
     * The default virtual warehouse to use for the session after connecting. Used
     * for performing queries, loading data, etc.
     */
    warehouse?: string;
    /** The default security role to use for the session after connecting. */
    role?: string;
    /**
     * By default, client connections typically time out approximately 3-4 hours
     * after the most recent query was executed. If the parameter clientSessionKeepAlive is set to true,
     * the client’s connection to the server will be kept alive indefinitely, even if no queries are executed.
     * The default setting of this parameter is false. If you set this parameter to true, make sure that your
     * program explicitly disconnects from the server when your program has finished.
     * Do not exit without disconnecting.
     */
    clientSessionKeepAlive?: boolean;
    /**
     * (Applies only when clientSessionKeepAlive is true)
     * This parameter sets the frequency (interval in seconds) between heartbeat messages.
     * You can loosely think of a connection heartbeat message as substituting for a query
     * and restarting the timeout countdown for the connection. In other words, if the connection
     * would time out after at least 4 hours of inactivity, the heartbeat resets the timer so that
     * the timeout will not occur until at least 4 hours after the most recent heartbeat (or query).
     * The default value is 3600 seconds (one hour). The valid range of values is 900 - 3600. Because
     * timeouts usually occur after at least 4 hours, a heartbeat every 1 hour is normally sufficient
     * to keep the connection alive. Heartbeat intervals of less than 3600 seconds are rarely necessary or useful.
     */
    clientSessionKeepAliveHeartbeatFrequency?: number;
}
