const {getVocabLesson} = require('../controllers/Vocab');
const { getDocs, collection ,getFirestore} = require('firebase/firestore');
const {firebase,db}= require('../config')
const app = require('../index')
const request = require('supertest');
// const {firebase}= require('../config')
// const firestore = getFirestore(firebase);
//thử
const math = require('../controllers/math');

describe('Math module', () => {
  test('Add function should add two numbers correctly', () => {
    expect(math.add(2, 3)).toBe(5);
  });

  test('Subtract function should subtract two numbers correctly', () => {
    expect(math.subtract(10, 4)).toBe(6);
  });
});
  describe('getVocabLesson', () => {
    test('should return the list of vocab lessons if Firestore query is successful', async () => {
        const response = await request(app)
        .get('/api/VocabLessons');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.vocablesson)).toBe(true);

    });

  });