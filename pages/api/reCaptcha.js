import { siteKey} from "../../config/reCaptha";
export default async function handler(req, res) {
    try {

      if (!siteKey) {
        throw new Error('RECAPTCHA_SITE_KEY environment variable not set');
      }
      res.status(200).json({ siteKey });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }