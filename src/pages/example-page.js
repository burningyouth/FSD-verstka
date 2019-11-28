let files = []; 

function importAll(r, array) {
  r.keys().forEach((s, i) => array[i] = r(s));
}

importAll(require.context('../blocks/example/', true, /(\.less|\.js)$/), files);
importAll(require.context('../blocks/wrapper/', true, /(\.less|\.js)$/), files);
importAll(require.context('../blocks/mixin/', true, /(\.less|\.js)$/), files);