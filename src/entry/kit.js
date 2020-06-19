let files = []; 

function importAll(r) {
    r.keys().forEach((s, i) => {
        files[i] = r(s);
    });
}


import 'tooltipster/dist/css/tooltipster.bundle.min.css';
import 'air-datepicker/dist/css/datepicker.min.css';
import '../less/generators.less';

importAll(require.context('../assets/', true, /\.css|\.js|\.less$/));
importAll(require.context('../blocks/', true, /(\.less|\.js)$/));