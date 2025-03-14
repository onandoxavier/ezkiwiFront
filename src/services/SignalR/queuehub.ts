import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

let Connection: HubConnection | null = null;
let QueueId: string = "";

export interface QueueHubProps {
  queueId: string;
}

export const getSignalRConnection = ({queueId } : QueueHubProps): HubConnection => {
  
  if (Connection != null && QueueId !== "" && QueueId !== queueId) {    
    QueueId = queueId
    Connection.stop().then(() => console.log("SignalR connection stopped from hub changing queue."));
    Connection = null; 
  }

  if (Connection == null) {  
    QueueId = queueId
    Connection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/queueHub`, {
        transport: HttpTransportType.ServerSentEvents | HttpTransportType.WebSockets 
      }) // Substitua pelo URL correto do seu hub
      .withAutomaticReconnect() // Habilita reconexão automática
      //.configureLogging(LogLevel.Information) // Configuração do nível de log
      .build();
    
    if (Connection) {
      Connection.start().then(() => {
        console.log("SignalR connection established in hub.");
        Connection!.invoke('JoinQueue', queueId);
        Connection!.onclose(async () => {
          console.log("SignalR connection closed by hub.");
        });
      }).catch((error) => {
        console.error("Error establishing SignalR connection in hub:", error);
      });
    };
  }
  return Connection;
};
