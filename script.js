const uploadInput = document.getElementById('upload');
const uploadedImage = document.getElementById('uploadedImage');
const resultDiv = document.getElementById('result');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

let faceDescriptor;

// Tải mô hình
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
}

// Xử lý ảnh khi người dùng tải lên
uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const img = await faceapi.bufferToImage(file);
    uploadedImage.src = img.src;

    const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    
    if (detections) {
        faceDescriptor = detections.descriptor;
        resultDiv.innerHTML = 'Đã nhận diện khuôn mặt!';
    } else {
        resultDiv.innerHTML = 'Không tìm thấy khuôn mặt.';
    }
});

// Đăng ký
registerButton.addEventListener('click', async () => {
    if (!faceDescriptor) {
        alert('Vui lòng tải lên một bức ảnh với khuôn mặt trước.');
        return;
    }

    // Lưu faceDescriptor (có thể lưu vào cơ sở dữ liệu)
    console.log('Face Descriptor (Đăng Ký):', faceDescriptor);
    alert('Đăng ký thành công! Khuôn mặt đã được lưu.');
});

// Đăng nhập
loginButton.addEventListener('click', async () => {
    if (!faceDescriptor) {
        alert('Vui lòng tải lên một bức ảnh với khuôn mặt trước.');
        return;
    }

    // So sánh faceDescriptor với những khuôn mặt đã lưu (giả lập)
    // Đây là nơi bạn sẽ thêm logic để so sánh với cơ sở dữ liệu
    const registeredDescriptors = []; // Đây là mảng chứa các faceDescriptor đã đăng ký
    // Giả lập so sánh (thay thế bằng logic thực tế)
    const isMatch = registeredDescriptors.some(registeredDescriptor => 
        faceapi.euclideanDistance(faceDescriptor, registeredDescriptor) < 0.6 // Ngưỡng cho sự trùng khớp
    );

    if (isMatch) {
        alert('Đăng nhập thành công!');
    } else {
        alert('Đăng nhập thất bại. Khuôn mặt không khớp.');
    }
});

// Tải mô hình khi tài liệu đã sẵn sàng
loadModels();
