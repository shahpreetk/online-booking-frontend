//@ts-check
import React from "react";
import { Media } from "react-bootstrap";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const ProfileCard = ({ name, photo, designation, linkedin, github }) => {
  return (
    <Media>
      <img
        width={100}
        height={100}
        className="align-center mr-3 border-0 bg-white rounded"
        src={photo}
        alt={photo}
      />
      <Media.Body>
        <h5>{name}</h5>
        <p>{designation}</p>
        <p>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#75191e" }}
            >
              {" "}
              <FaLinkedin size={25} />
            </a>
          )}{" "}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#75191e" }}
            >
              {" "}
              <FaGithub size={25} />
            </a>
          )}
        </p>
      </Media.Body>
    </Media>
  );
};

export default ProfileCard;
