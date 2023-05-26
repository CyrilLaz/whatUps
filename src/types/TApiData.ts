export type TApiData = { host: string, idInstance: string, apiTokenInstance: string };
export type TGetSettings = {
    wid:                               string;
    countryInstance:                   string;
    typeAccount:                       string;
    webhookUrl:                        string;
    webhookUrlToken:                   string;
    delaySendMessagesMilliseconds:     number;
    markIncomingMessagesReaded:        string;
    markIncomingMessagesReadedOnReply: string;
    sharedSession:                     string;
    proxyInstance:                     string;
    outgoingWebhook:                   string;
    outgoingMessageWebhook:            string;
    outgoingAPIMessageWebhook:         string;
    incomingWebhook:                   string;
    deviceWebhook:                     string;
    statusInstanceWebhook:             string;
    stateWebhook:                      string;
    enableMessagesHistory:             string;
    keepOnlineStatus:                  string;
}

