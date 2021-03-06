const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const promisify = require('es6-promisify');

exports.addReview = async (req, res) => {
    req.body.author = req.user._id;
    req.body.store = req.params.id;
    const newReview = new Review(req.body);
    await newReview.save();
    req.flash('success', 'Thanks for submitting a review');
    res.redirect('back');
};