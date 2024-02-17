import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosEndPoints/userAxios";

const MyListings = () => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        const fetchedData = await axiosInstance.get('/auction/get_my_listings')
    }

    useEffect(() => {
        fetchData();
    },[])

  return (
    <>
      {/* component */}
      <div className="md:px-10 py-8 w-full mr-4 flex justify-center items-center">
        {/* <div className="shadow overflow-hidden rounded border-b border-gray-200"> */}
        <table className="w-full lg:w-2/3 xl:w-2/2 bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>

              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data?.map((data, index) => (
              <tr key={index}>
                <td className="w-1/3 text-left py-3 px-4">
                  {`${
                    (
                      data as {
                        studentFirstName?: string;
                        studentLastName?: string;
                      }
                    )?.studentFirstName
                  } ${
                    (
                      data as {
                        studentFirstName?: string;
                        studentLastName?: string;
                      }
                    )?.studentLastName
                  }`}
                </td>

                <td className="text-left py-3 px-4">
                  {(data as { studentEmail?: string })?.studentEmail}
                </td>
                <td className="text-left py-3 px-4">
                  <button className="px-1 py-1 bg-blue-300 hover:bg-yellow-600 text-white text-sm font-medium rounded-full">
                    Active
                  </button>
                </td>
                <td className="text-left py-3 px-4">
                  <label className="relative inline-flex items-center mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultValue=""
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </>
  );
};

export default MyListings;
