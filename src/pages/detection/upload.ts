import axios from 'axios';
import { getFileMD5 } from '../../services/fileutils';
import { isUploadDisabled, queryUploadSlice, reset, headers, emits } from './FileUpload.vue';

export const upload = async (file: File[]) => {
isUploadDisabled.value = true;
const hash = await getFileMD5(file[0]);
// check hash in server
const slices = await queryUploadSlice(file[0], hash);
console.log(slices);
return;
const respHash = await axios.post('/api/file/query', { condition: { hash: hash } }).catch(() => {
init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' });
return reset();
});
if (0 < respHash?.data.code) {
init({ message: "文件上传失败：" + respHash?.data.msg, color: 'danger' });
return reset();
}

if (0 == respHash?.data.data.length) {
const formData = new FormData();
formData.append('file', file[0]);
formData.append('hash', hash);
const resp = await axios.post('/api/file/upload', formData, { headers: headers }).catch((err) => {
init({ message: "文件上传失败，系统错误，请联系系统管理员!", color: 'danger' });
console.log(err);
});
return emits("afterUpload", resp?.data.data);
}

// to detect log file
return emits("afterUpload", respHash?.data.data[0]);
};
