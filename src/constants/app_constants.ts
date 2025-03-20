export default class AppConstants {
    static port = process.env.PORT || 80;
    static supabaseUrl = process.env.SUPABASE_URL;
    static supabaseServiceKey = process.env.SUPABASE_KEY;
}