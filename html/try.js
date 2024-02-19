fetch('http://localhost:3000/topic/detail?actid=111551188')
    .then((res) => res.json())
    .then((res) => console.log(res))