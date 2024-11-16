import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Users extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    bio: string;

    @Prop({ unique: true })
    username: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    profilePicture: string;

    @Prop()
    lastActive: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
