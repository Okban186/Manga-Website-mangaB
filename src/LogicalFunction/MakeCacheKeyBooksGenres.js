function makeCacheKey(genres, pageNumber, pageSize) {
    // sắp xếp genres để tránh khác thứ tự
    const sortedGenres = [...genres].sort().join(',');
    return `booksLastModified:${sortedGenres}:${pageNumber}:${pageSize}`;
  }

export {makeCacheKey}