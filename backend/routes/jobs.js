const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');

const router = express.Router();

// Validation middleware
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required')
    .isLength({ max: 100 }).withMessage('Job title cannot exceed 100 characters'),
  body('company').trim().notEmpty().withMessage('Company name is required')
    .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
  body('location').trim().notEmpty().withMessage('Location is required')
    .isLength({ max: 100 }).withMessage('Location cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Job description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('salary').optional().trim()
    .isLength({ max: 50 }).withMessage('Salary cannot exceed 50 characters'),
  body('type').optional().isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),
  body('remote').optional().isBoolean().withMessage('Remote must be a boolean')
];

// GET /api/jobs - Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs'
    });
  }
});

// GET /api/jobs/:id - Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching job'
    });
  }
});

// POST /api/jobs - Create new job
router.post('/', jobValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job'
    });
  }
});

// PUT /api/jobs/:id - Update job
router.put('/:id', jobValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating job'
    });
  }
});

// DELETE /api/jobs/:id - Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting job'
    });
  }
});

module.exports = router;