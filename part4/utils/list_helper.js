const { reduce } = require('lodash');
const _ = require('lodash');
const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const mostLiked = blogs.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const topAuthor = _(blogs)
    .countBy((i) => i.author)
    .entries()
    .maxBy(_.last);
  return {
    author: _.first(topAuthor),
    count: _.last(topAuthor)
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const groupedAuthors = _(blogs).groupBy('author');
  const authorLikes = _(groupedAuthors).map((authorBlogs, author) => ({
    author: author,
    likes: _(authorBlogs).sumBy('likes')
  })).value();

  console.log(authorLikes);
  return _(authorLikes).maxBy('likes');

};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

