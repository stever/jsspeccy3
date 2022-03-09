import {select, takeLatest, put} from "redux-saga/effects";
import {push} from "connected-react-router";
import gql from "graphql-tag";
import {gqlFetch} from "../../graphql_fetch";
import {
    actionTypes,
    receivePrivacyPolicy,
    receiveTermsOfUse
} from "../actions/app";
import {setSelectedTabIndex as setDemoTabIndex} from "../actions/demo";
import {setSelectedTabIndex} from "../actions/project";
import {reset} from "../actions/jsspeccy";

// -----------------------------------------------------------------------------
// Action watchers
// -----------------------------------------------------------------------------

// noinspection JSUnusedGlobalSymbols
export function* watchForShowActiveEmulatorActions() {
    yield takeLatest(actionTypes.showActiveEmulator, handleShowActiveEmulatorActions);
}

// noinspection JSUnusedGlobalSymbols
export function* watchForResetEmulatorActions() {
    yield takeLatest(actionTypes.resetEmulator, handleResetEmulatorActions);
}

// noinspection JSUnusedGlobalSymbols
export function* watchForRequestTermsOfUseActions() {
    yield takeLatest(actionTypes.requestTermsOfUse, handleRequestTermsOfUseActions);
}

// noinspection JSUnusedGlobalSymbols
export function* watchForRequestPrivacyPolicyActions() {
    yield takeLatest(actionTypes.requestPrivacyPolicy, handleRequestPrivacyPolicyActions);
}

// -----------------------------------------------------------------------------
// Action handlers
// -----------------------------------------------------------------------------

function* handleShowActiveEmulatorActions(_) {
    const projectId = yield select((state) => state.project.id);
    const isProject = typeof projectId !== 'undefined';

    if (isProject) {
        yield put(setSelectedTabIndex(1));
        yield put(push(`/projects/${projectId}`));
    } else {
        yield put(setDemoTabIndex(0));
        yield put(push('/'));
    }
}

function* handleResetEmulatorActions(_) {
    const projectId = yield select((state) => state.project.id);
    const isProject = typeof projectId !== 'undefined';

    if (isProject) {
        yield put(setSelectedTabIndex(1));
        yield put(push(`/projects/${projectId}`));
        yield put(reset());
    } else {
        yield put(setDemoTabIndex(0));
        yield put(push('/'));
        yield put(reset());
    }
}

function* handleRequestTermsOfUseActions(_) {
    const query = gql`
        query {
            text(where: {name: {_eq: "terms-of-use"}, lang: {_eq: "en"}}) {
                text
            }
        }
    `;

    const variables = {};
    const userId = yield select((state) => state.identity.userId);
    const response = yield gqlFetch(userId, query, variables);
    console.assert(response?.data?.text, response);
    console.assert(response?.data?.text.length === 1, response);
    console.assert(response?.data?.text[0].text, response);
    yield put(receiveTermsOfUse(response.data.text[0].text));
}

function* handleRequestPrivacyPolicyActions(_) {
    const query = gql`
        query {
            text(where: {name: {_eq: "privacy-policy"}, lang: {_eq: "en"}}) {
                text
            }
        }
    `;

    const variables = {};
    const userId = yield select((state) => state.identity.userId);
    const response = yield gqlFetch(userId, query, variables);
    console.assert(response?.data?.text, response);
    console.assert(response?.data?.text.length === 1, response);
    console.assert(response?.data?.text[0].text, response);
    yield put(receivePrivacyPolicy(response.data.text[0].text));
}