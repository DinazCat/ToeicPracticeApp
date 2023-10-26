const express = require('express')
const router = express.Router();
const {getVocabLesson, getVocabinLesson, getVocabs, setAlarmVocab, getAlarmVocab, updateAlarmVocab} = require('../controllers/Vocab')

router.get('/VocabLessons',getVocabLesson)
router.get('/VocabinLesson/:TopicId',getVocabinLesson)
router.get('/Vocabs',getVocabs)
router.get('/getAlarmVocab/:userId',getAlarmVocab)
router.post('/alarmVocab/:userId',setAlarmVocab)
router.put('/updateAlarmVocab/:userId', updateAlarmVocab)
module.exports = router