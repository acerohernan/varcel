import { env } from "@/config/env";
import { injectable } from "inversify";
import { RoomServiceClient } from "livekit-server-sdk";

@injectable()
export class RealtimeService {
  private roomService: RoomServiceClient;

  constructor() {
    this.roomService = new RoomServiceClient(
      env.LIVEKIT_URL,
      env.LIVEKIT_API_KEY,
      env.LIVEKIT_SECRET
    );
  }

  async createRoom({
    roomName,
  }: {
    roomName: string;
  }): Promise<{ roomId: string }> {
    const room = await this.roomService.createRoom({
      name: roomName,
      emptyTimeout: 60 * 60, // 1 hour
    });

    return { roomId: room.name };
  }
}
