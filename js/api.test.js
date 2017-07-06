import 'isomorphic-fetch';
import assert from 'assert';
import {loadResults} from './api';

describe(`Loader`, () => {

  it(`loadResults error`, () => {
    return loadResults(`ivan000asfljsdkfjs`)
      .then((resp) => {
        assert.equal(resp.status, 404);
        return resp;
      });
  });


});
