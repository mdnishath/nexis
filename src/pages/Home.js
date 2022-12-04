import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  let navigate = useNavigate();
  const [token, seToken] = useState(
    JSON.parse(localStorage.getItem("nishtoken"))
  );
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const arr = [];
    setLoading(true);
    const getAttendance = async () => {
      const res = await axios.get("https://test.nexisltd.com/test ", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      for (let [key, value] of Object.entries(res.data)) {
        arr.push(value);
      }
      // const arr = Object.entries(res.data);
      setData(arr);
      setLoading(false);
    };
    getAttendance();
  }, []);
  console.log(data);
  return (
    <>
      <div className="container mx-auto py-4 md:py-[100px] px-4 md:px-0">
        <div className="">
          <img src="images/logo.png" alt="Logo" />
          <div className="flex justify-center">
            <h1 className=" inline-block py-[17px] px-[42px] font-inter bg-primary text-white tex-[36px] font-semibold rounded mx-auto">
              Attendance information
            </h1>
          </div>
          {loading ? (
            <div className="w-full flex justify-center">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : (
            <div className=" pt-[80px]">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className=" font-inter font-medium  px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-black text-[20px] uppercase tracking-wider">
                      id
                    </th>
                    <th className=" font-inter font-medium  px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-black text-[20px] uppercase tracking-wider">
                      name
                    </th>
                    <th className=" font-inter font-medium  px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs text-black text-[20px] uppercase tracking-wider">
                      branch
                    </th>
                    <th className=" font-inter font-medium  px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs text-black text-[20px] uppercase tracking-wider">
                      position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <>
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {item.id}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {item.name}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {item.branch}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                            {item.position}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
