import React from "react";

const Modal = ({ isOpen, onClose, children, h,w }) => {
	if (!isOpen) return null;

	return (

		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					background: "white",
					height: "65vh" ,
					width: "40vw",
					margin: "auto",
					padding: "2%",
					border: "2px solid #000",
					borderRadius: "10px",
					boxShadow: "2px solid black",
				}}
			>
                <div className="flex justify-end select-none cursor-pointer hover:font-bold" onClick={onClose}>
                    x
                </div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
