export default function Recommend() {
  return (
    <div className="container recommend">
      <div className="recommend-ezin px-5">
        <h3 className="title text-center py-4">
          Ezin <span className="text-dark">giới thiệu</span>
        </h3>
        <iframe
          width="100%"
          height="577"
          src="https://www.youtube.com/embed/Lax3BiQqVrQ?autoplay=0"
          title="Quy tắc bảo hiểm"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="pb-5"
        ></iframe>
      </div>
    </div>
  );
}
