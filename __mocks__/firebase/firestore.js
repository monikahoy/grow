const Timestamp = {
  fromDate: jest.fn(date => ({
    toDate: () => date,
    seconds: Math.floor(date.getTime() / 1000),
    nanoseconds: (date.getTime() % 1000) * 1000000,
  })),
};

export {Timestamp};
