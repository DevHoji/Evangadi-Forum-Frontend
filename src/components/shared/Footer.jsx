/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Stack, IconButton } from "@mui/material";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/evangadi-logo-f.png";

const Footer = () => {
  return (
    <footer className="bg-[#3A4559] text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between md:items-start md:text-left">
          <div className="mb-6 md:mb-0 md:text-left">
            <div className="mb-4">
              <img src={logo} alt="Evangadi Logo" className="h-10 md:h-12" />
            </div>
            <Stack direction="row" spacing={1} md:justifyContent="flex-start">
              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com/"
              >
                <FaFacebook color="#fff" fontSize="medium" />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://www.instagram.com/"
              >
                <FaInstagram color="#fff" fontSize="medium" />
              </IconButton>

              <IconButton aria-label="YouTube" href="https://www.youtube.com/">
                <FaYoutube color="#fff" fontSize="medium" />
              </IconButton>
            </Stack>
          </div>
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300 block">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <address className="space-y-2">
              <div className="text-gray-200">EvangadiNetworks</div>
              <div>
                <a
                  href="mailto:support@evangadigmail.com"
                  className="hover:text-gray-300"
                >
                  support@evangadigmail.com
                </a>
              </div>
              <div>
                <a href="tel:+1-202-386-2700" className="hover:text-gray-300">
                  +1-202-386-2700
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
