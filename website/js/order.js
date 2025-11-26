function changeStatus(orderId, newStatus) {
    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("status", newStatus);

    fetch("updateStatus.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "success") {
            console.log("Order status updated");
        } else {
            alert("خطا در بروزرسانی وضعیت!");
        }
    });
}
