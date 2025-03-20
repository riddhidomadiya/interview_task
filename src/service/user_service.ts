import { LoginTypes, SignupTypes, IsUserExistTypes, UserTypes } from "../utils/types/user_types";
import supabase from "../supabase/create_client";
import bcrypt from "bcryptjs";
import errorResponse from "../utils/errors/errorResponse";
import { createJwtToken } from "../utils/service/user_service";

export const dataReturnOnlyIfUserExist = async ({ userId }: IsUserExistTypes) => {
    const { data: user } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single();

    if (!user) {
        throw errorResponse.Api404Error({
            errorDescription: "User not found",
        });
    }
    return user as UserTypes;
};

export const insertUser = async (validatedData: SignupTypes) => {
    try {
        const { name, email, password } = validatedData

        const { data, error } = await supabase
            .from("user")
            .select("*")
            .eq("email", email)
            .single();

        if (data) {
            throw errorResponse.Api403Error({
                errorDescription: "User already exist with this email",
                errorFieldName: "email",
            });
        }

        // hash user password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Insert user data into Supabase
        await supabase
            .from("user")
            .insert([{ name, email, password: hashedPassword }])
            .select()
            .single();

    } catch (error) {
        throw error
    }
};

export const matchUserAndGenerateJwtToken = async (validatedData: LoginTypes) => {
    try {
        const { email, password } = validatedData

        // Fetch user
        const { data: user, error } = await supabase
            .from("user")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            throw errorResponse.Api404Error({
                errorDescription: "User not found with this email",
                errorFieldName: "email",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw errorResponse.Api400Error({
                errorDescription: "Invalid credentials",
                errorFieldName: "password",
            });
        }

        // Generate JWT Token
        const token = await createJwtToken(user)
        return token
    } catch (error) {
        throw error
    }
};