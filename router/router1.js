const express = require('express')
const router = express.Router();
const {getVocabLesson, getVocabinLesson, getVocabs, setAlarmVocab, getAlarmVocab, updateAlarmVocab} = require('../controllers/Vocab')
const {setUserInfo, updateUser, getAllUsers, getUserData} = require ('../controllers/User')
const {uploadAudio, uploadPracticeHistory} = require ('../controllers/SWskills')

router.get('/VocabLessons',getVocabLesson)
router.get('/VocabinLesson/:TopicId',getVocabinLesson)
router.get('/Vocabs',getVocabs)
router.get('/getAlarmVocab/:userId',getAlarmVocab)
router.post('/alarmVocab/:userId',setAlarmVocab)
router.put('/updateAlarmVocab/:userId', updateAlarmVocab)
router.put('/setUserInfo/:userId', setUserInfo)
router.put('/updateUser/:userId', updateUser)
router.get('/Users', getAllUsers)
router.get('/UserData/:userId', getUserData)
router.post('/uploadAudio', uploadAudio)
router.post('/uploadPracticeHistory', uploadPracticeHistory)
module.exports = router