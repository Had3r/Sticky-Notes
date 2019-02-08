import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { pre } = hh(h);

function view(msg, model) {
    return pre(JSON.stringify(model, null, 3));
}


export default view;