import NewsAPI from 'newsapi';

const newsapi = new NewsAPI(`${process.env.API_KEY}`);

export const fetchTopHeadlines = async (req, res, next) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      q: 'bitcoin',
      category: 'business',
      language: 'en',
      country: 'us'
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const fetchEverythingBitcoin = async (req, res, next) => {
  try {
    const response = await newsapi.v2.everything({
      q: 'bitcoin',
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk, techcrunch.com',
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const fetchSourceTechnology = async (req, res, next) => {
  try {
    const response = await newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};
