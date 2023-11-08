const {setAlarmVocab,getAlarmVocab} = require('../controllers/Vocab');
const { collection, getDocs,getFirestore,doc,getDoc} = require('firebase/firestore');
const app = require('../index')
const request = require('supertest');


jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  getFirestore:jest.fn(),
  doc: jest.fn(),
  getDoc:jest.fn(),
}));
//
describe('getVocabs', () => {
  test('should return a list of vocabs if successful', async () => {
    const mockQuerySnapshot = {
      docs: [
        { id: '1', data: jest.fn(() => ({ vocab: 'word1' })) },
        { id: '2', data: jest.fn(() => ({ vocab: 'word2' })) },
      ],
    };

    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const response = await request(app).get('/api/Vocabs');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vocabs).toEqual([
      { vocab: 'word1', Id: '1' },
      { vocab: 'word2', Id: '2' },
    ]);
  });

  test('should return an alert error if an error occurs', async () => {
    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockRejectedValueOnce(new Error('mockError'));

    const response = await request(app).get('/api/Vocabs');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('something went wrong when get data from getVocabs');
  });
});

//
describe('getVocabLesson', () => {
  test('should return the list of vocab lessons if Firestore query is successful', async () => {
    const mockQuerySnapshot = {
      docs: [
        { id: '1', data: jest.fn(() => ({ vocablession: 'lesson1' })) },
        { id: '2', data: jest.fn(() => ({ vocablession: 'lesson2' })) },
      ],
    };

    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const response = await request(app).get('/api/VocabLessons');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vocablesson).toEqual([
      { vocablession: 'lesson1', Id: '1' },
      { vocablession: 'lesson2', Id: '2' },
    ]);
  });

  test('should return an alert error if an error occurs', async () => {
    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockRejectedValueOnce(new Error('mockError'));

    const response = await request(app).get('/api/VocabLessons');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('something went wrong when get data from vocablesson');
  });
});
//
describe('getVocabinLesson', () => {
  test('should return the list of vocabs in a Lesson if Firestore query is successful', async () => {
    const mockQuerySnapshot = {
      docs: [
        { id: '1', data: jest.fn(() => ({ vocab: 'word1', TopicId:'aaa' })) },
        { id: '2', data: jest.fn(() => ({ vocab: 'word2', TopicId:'aaa' })) },
      ],
    };

    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const response = await request(app).get('/api/VocabinLesson/aaa');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vocabs).toEqual([
      { vocab: 'word1', TopicId:'aaa', Id: '1' },
      { vocab: 'word2', TopicId:'aaa', Id: '2' },
    ]);
  });

  test('should return an alert error if an error occurs', async () => {
    collection.mockReturnValueOnce('mockCollection');
    getDocs.mockRejectedValueOnce(new Error('mockError'));

    const response = await request(app).get('/api/VocabinLesson/aaa');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('something went wrong when get data from getVocabinLesson');
  });
});



  