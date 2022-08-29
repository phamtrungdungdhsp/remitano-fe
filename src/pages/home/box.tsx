import "./style.css";

export const Box = ({ title, sharedBy, description, url }: any) => {
  return (
    <div className="box">
      <div className="left">
        <iframe
          width="300"
          height="200"
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="right">
        <h3 className="title">{title}</h3>
        <p>Shared by: <b>{sharedBy}</b></p>
        <p>Description:</p>
        <p>{description.slice(0, 120)}...</p>
      </div>
    </div>
  );
};
