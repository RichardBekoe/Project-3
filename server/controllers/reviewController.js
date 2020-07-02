const Review = require('../models/reviewModel')
const Campground = require('../models/campgroundModel')
const RecArea = require('../models/recAreaModel')
const User = require('../models/userModel')

function findSiteAndCreateReview(siteCollection, siteId, review, req, res) {
  siteCollection
    .findById(siteId)
    .then(site => {
      Review
        .create(review)
        .then(review => {
          site.reviews.push(review)
          site.save()
          res.status(201).send({ message: 'Review successfully posted.' })
        })
        .catch(err => res.status(400).send(err))
    })
    .catch(err => res.status(400).send(err))
}

function createReview(req, res) {
  const siteCollection = req.url.includes('campgrounds') ? Campground : RecArea
  const siteId = req.params.siteId
  req.body.user = req.currentUser._id
  siteCollection === Campground ? req.body.campgroundRef = siteId : req.body.recAreaRef = siteId
  const review = req.body
  findSiteAndCreateReview(siteCollection, siteId, review, req, res)
}

function editReview(req, res) {
  Review
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Review not found' })
      if (!review.user.equals(req.currentUser._id) && !req.currentUser.isAdmin) return res.status(401).send({ message: 'You can\'t edit someone else\'s review' })
      review.set(req.body)
      return review.save()
    })
    .then(updatedReview => res.status(201).send(updatedReview))
}

function deleteReview(req, res) {
  Review
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Not found' })
      if (!review.user.equals(req.currentUser._id) && !req.currentUser.isAdmin) return res.status(401).send({ message: 'You can\'t delete someone else\'s review.' })
      return review.remove()
    })
    .then(deletedReview => res.status(200).send(deletedReview))
}

function readAllForUser(req, res) {
  Review
    .find({ user: req.user })
    .populate('comments')
    .then(reviews => {
      res.status(200).send(reviews)
    })
    .catch(err => console.log(err))
}

module.exports = { createReview, readAllForUser, editReview, deleteReview }