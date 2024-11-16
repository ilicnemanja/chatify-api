import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class FriendRequests extends Document {
    @Prop()
    senderId: string;

    @Prop()
    receiverId: string;

    @Prop({ default: "pending" })
    status: string;

    @Prop({ default: false })
    isCloseFriend: boolean;
}

export const FriendRequestsSchema = SchemaFactory.createForClass(FriendRequests);
