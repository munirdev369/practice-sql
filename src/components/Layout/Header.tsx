import React, { useRef, useState } from "react";
import {
	Container,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const navItems = [
	{ id: 1, title: "Editor", link: "/" },
];

const Header = () => {
	const navigate = useNavigate();

	const appearRef = useRef<boolean>(false);
	return (
		<header className="header">
			<Navbar
				expand="lg"
				style={{ paddingLeft: "30px", paddingRight: "30px", height: 80 }}
			>
				<Container fluid>
					<Navbar.Brand
						onClick={() => navigate("/questions")}
						style={{ color: "white" }}
						href="#"
					>
						Practice SQL Quiz
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="practicesqlnavbar" />

					<Navbar.Collapse id="practicesqlnavbar">
						<Nav className="mb-2 ms-auto mb-lg-0 me-2">
							{navItems.map((item) => (
								<NavItem onClick={() => navigate(item.link)} key={item.id}>
									<NavLink>{item.title}</NavLink>
								</NavItem>
							))}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
