import co from 'co';
import { uniq } from 'lodash';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import APIError from '../helpers/apierror.helper';
import Paper from '../models/paper.model'

function index(req, res, next) {
    const query = req.query;
    Paper.list({ query })
        .then(result => {
            if (result.length === 0) {
                let err = new APIError('not found', httpStatus.NOT_FOUND);
                return next(err);
            }
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function create(req, res, next) {
    const body = req.body;
    const paper = new Paper(body);
    paper.save()
        .then(rs => {
            return res.send(rs)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}


function show(req, res, next) {
    const query = req.params;
    Paper.get({ query })
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function update(req, res, next) {
    const params = req.params;
    const body = req.body;
    Paper.findOneAndUpdate(params, body)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function destroy(req, res, next) {
    const params = req.params;
    const body = req.body;
    Paper.findOneAndRemove(params)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function edit(req, res, next) {

}

export default {
    index,
    create,
    show,
    update,
    destroy,
    edit
}
