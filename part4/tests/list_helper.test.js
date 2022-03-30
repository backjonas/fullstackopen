const helper = require('./test_helper')
const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog, return that blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog);
    const expectedResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    };

    expect(result).toEqual(expectedResult);
  });

  test('of empty list returns an empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('of a bigger list returns the correct blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithManyBlogs);
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    };
    expect(result).toEqual(expectedResult);
  });
});

describe('most articles', () => {
  test('when list has only one blog, return that author', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog);
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      count: 1
    };

    expect(result).toEqual(expectedResult);
  });

  test('of empty list returns an empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test('of a bigger list returns the correct author', () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs);
    const expectedResult = {
      author: "Robert C. Martin",
      count: 3,
    };
    expect(result).toEqual(expectedResult);
  });
});

describe('most likes', () => {
  test('when list has only one blog, return that author', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog);
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    };

    expect(result).toEqual(expectedResult);
  });

  test('of empty list returns an empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test('of a bigger list returns the correct author', () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs);
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    expect(result).toEqual(expectedResult);
  });
});