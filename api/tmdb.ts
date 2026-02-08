// export default async function handler(req: any, res: any) {
//     try {
//         const { url: reqUrl } = req;
//         if (!reqUrl) {
//             return res.status(400).json({ error: 'Request URL is missing' });
//         }

//         // Get the path after /api/tmdb
//         // e.g., /api/tmdb/movie/popular -> /movie/popular
//         const tmdbPath = reqUrl.replace(/^\/api\/tmdb/, '').split('?')[0];

//         const apiKey = process.env.VITE_APP_TMDB_V3_API_KEY;
//         if (!apiKey) {
//             console.error('TMDB API Key missing in environment');
//             return res.status(500).json({ error: 'Server configuration error' });
//         }

//         const baseUrl = 'https://api.themoviedb.org/3';
//         const targetUrl = new URL(`${baseUrl}${tmdbPath}`);
//         console.log(targetUrl);
//         // Forward query parameters from original request
//         const clientUrl = new URL(reqUrl, 'http://localhost');
//         clientUrl.searchParams.forEach((value, key) => {
//             targetUrl.searchParams.set(key, value);
//         });

//         // Add the API key
//         targetUrl.searchParams.set('api_key', apiKey);

//         const response = await fetch(targetUrl.toString());
//         const data = await response.json().catch(() => ({}));

//         if (!response.ok) {
//             return res.status(response.status).json(data || { error: 'Failed to fetch from TMDB' });
//         }

//         return res.status(200).json(data);
//     } catch (error: any) {
//         console.error('Proxy error:', error);
//         return res.status(500).json({
//             error: 'Internal Server Error',
//             message: error.message
//         });
//     }
// }
