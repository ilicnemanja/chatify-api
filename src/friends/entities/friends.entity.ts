import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Friends extends Document {
    @Prop()
    clerkId: string;

    @Prop()
    friendClerkId: string;

    @Prop({ default: false })
    isCloseFriend: boolean;
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);
