const express = require('express')
const router = express.Router();
const {getVocabLesson, getVocabinLesson, getVocabs, setAlarmVocab, getAlarmVocab, updateAlarmVocab} = require('../controllers/Vocab')
const {setUserInfo, updateUser, getAllUsers, getUserData,updateUserPrivate} = require ('../controllers/User')
const {uploadAudio, uploadPracticeHistory} = require ('../controllers/SWskills')
const {getQuestion, pushPracticeHistory, getOneQuestion} = require('../controllers/Question')
const {uploadPracticePlan, getPracticePlan, updatePracticePlan} = require('../controllers/PracticePlan')
const {addPost, updatePost, addComment, getOneComment, addNotification, deleteNotification, updateNotification,
     filterOnlyPost,filterOnlyhashtag,filterBoth, pushSavedPost, getSavedPost, deletePost}=require('../controllers/Post')

router.get('/VocabLessons',getVocabLesson)
router.get('/VocabinLesson/:TopicId',getVocabinLesson)
router.get('/Vocabs',getVocabs)
router.get('/getAlarmVocab/:userId',getAlarmVocab)
router.post('/alarmVocab/:userId',setAlarmVocab)
router.put('/updateAlarmVocab/:userId', updateAlarmVocab)
router.put('/setUserInfo/:userId', setUserInfo)
router.put('/updateUser/:userId', updateUser)
router.put('/updateUserPrivate/:userId', updateUserPrivate)
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
router.put('/PracticePlan/:userId/update', updatePracticePlan)
//post
router.post('/addPost', addPost)
router.put('/updatePost/:postId', updatePost)
router.post('/addComment/:sign/:momId', addComment)
router.post('/addNotification', addNotification)
router.get('/getoneComment/:commentId',getOneComment)
router.delete('/deleteNoti/:notiId',deleteNotification)
router.put('/updateNoti/:notiId', updateNotification)
router.get('/filterOnlyhashtag/:hashtag',filterOnlyhashtag)
router.get('/filterOnlyPost/:userId/:type',filterOnlyPost)
router.get('/filterBoth/:userId/:type/:hashtag',filterBoth)
router.put('/savePost/:userId/:postId', pushSavedPost)
router.get('/getsavePost/:userId',getSavedPost)
router.delete('/deletePost/:postId',deletePost)
module.exports = router