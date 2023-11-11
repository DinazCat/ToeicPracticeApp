const express = require('express')
const router = express.Router();
const {getVocabLesson, getVocabinLesson, getVocabs, setAlarmVocab, getAlarmVocab, updateAlarmVocab} = require('../controllers/Vocab')
const {setUserInfo, updateUser, getAllUsers, getUserData} = require ('../controllers/User')
const {uploadAudio, uploadPracticeHistory} = require ('../controllers/SWskills')
const {getQuestion, pushPracticeHistory, getOneQuestion} = require('../controllers/Question')
const {uploadPracticePlan, getPracticePlan, updatePracticePlan} = require('../controllers/PracticePlan')
const {updatePost, addComment, getOneComment}=require('../controllers/Post')

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
//question
router.get('/Question/:Part/:userId/:number',getQuestion)
router.post('/PracticeHistory/:userId/:sign',pushPracticeHistory)
router.get('/oneQuestion/:Part/:Qid',getOneQuestion)
//PracticePlan
router.post('/PracticePlan/:userId/add', uploadPracticePlan)
router.get('/PracticePlan/:userId', getPracticePlan)
router.get('/PracticePlan/:userId/update', updatePracticePlan)
//post
router.put('/updatePost/:postId', updatePost)
router.post('/addComment/:sign/:momId', addComment)
router.get('/getoneComment/:commentId',getOneComment)
module.exports = router