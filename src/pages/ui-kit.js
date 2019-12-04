let files = []; 

function importAll(r) {
    r.keys().forEach((s, i) => {
        files[i] = r(s);
    });
}

import 'air-datepicker/dist/css/datepicker.min.css';

importAll(require.context('../assets/', true, /\.css|\.js|\.less$/));
importAll(require.context('../blocks/', true, /(\.less|\.js)$/));