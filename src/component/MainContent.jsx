import React, { useEffect, useState } from "react";
import "./maincontent.css";
import axios from "axios";
import { timelineOptions, countryOption, timelinemap } from './data';

const MainContent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [holidaysPermanent, setholidaysPermanent] = useState([]);
  const [timelineOption, setTimelineOption] = useState("");
  const [country, setCountry] = useState("");

  /**
 * @DESC From Date To To Date Filter Function 
 */

  const fromToFilter = (a) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const tempDate = new Date(a.date);
    return tempDate >= fromDate && tempDate <= toDate;
  };
  const timelineFilter = (a) => {
    const currTime = new Date();
    const thisTime = new Date(a.date);
    return (
      currTime - thisTime <=
      1000 * 24 * 60 * 60 * timelinemap[timelineOption] &&
      currTime - thisTime >= 0
    );
  };

  /** 
* @DESC Filter by country
*/
  const countryFilter = (a) => {
    return a.country === country;
  };

  /** 
* @DESC all filter option applly using below function
*/
  const handleApplyFilter = (e) => {
    e.preventDefault();
    let newHolidays = holidaysPermanent;
    if (from && to) {
      newHolidays = newHolidays.filter(fromToFilter);
    }
    if (timelineOption) {
      newHolidays = newHolidays.filter(timelineFilter);
    }
    if (country) {
      newHolidays = newHolidays.filter(countryFilter);
    }

    setHolidays(newHolidays);

  };

    /** 
* @DESC clear input and date data 
*/
  const handleClearFilters = (e) => {
    e.preventDefault();
    setFrom("");
    setTo("");
    setTimelineOption("");
    setCountry("");
    setHolidays(holidaysPermanent);
  };

    /** 
* @DESC Fetch data and devided all data by diffrent countries
*/
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://www.gov.uk/bank-holidays.json");

      const england = response.data["england-and-wales"].events.map((item) => ({
        ...item,
        country: "england-and-wales",
      }));
      const scotland = response.data["scotland"].events.map((item) => ({
        ...item,
        country: "scotland",
      }));
      const northIreland = response.data["northern-ireland"].events.map((item) => ({
        ...item,
        country: "northern-ireland",
      }));
      setHolidays(england.concat(scotland).concat(northIreland));
      setholidaysPermanent(england.concat(scotland).concat(northIreland));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => { }, [holidays]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      
      <div className="filter_header">
        <h1 className="filter_heading">
          Filter your holidays with the options below
        </h1>
      </div>
      
      <div className="filter_container">
        <div className="filter_options_container">
          <div className="timeline_filter_container">
            <span className="timeline_filter_container_text">Country</span>

            <select className="filter_select" onChange={(e) => setCountry(e.target.value)} value={country}>
              {countryOption.map((option) => (
                <option className="filter_item" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="timeline_filter_container">
            <span className="timeline_filter_container_text">
              Holidays in{" "}
            </span>

            <select className="filter_select" value={timelineOption} onChange={(e) => setTimelineOption(e.target.value)}>
              {timelineOptions.map((option) => (
                <option className="filter_item" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="from_date_container">
            <span className="timeline_filter_container_text">From</span>
            <input
              className="date_input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>

          <div className="to_date_container">
            <span className="timeline_filter_container_text">To</span>
            <input type="date" className="date_input" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>


        <div className="buttons_container">
          <button className="filter_button" type="submit" onClick={handleApplyFilter}>
            Apply Filters
          </button>

          <button
            className="clear_filter_button" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>


      <div className="results_header">
        <div className="result_header_text">Title</div>
        <div className="result_header_text">Country</div>
        <div className="result_header_text">Date</div>
        <div className="result_header_text">Notes</div>
        <div className="result_header_text">Bunting</div>
      </div>


      <div className="results_container">
        {holidays.map((item) => {
          return (
            <div className="single_holiday" key={item.date}>
              <div className="holiday_wrapper">
                <div className="result_text_title">{item.title}</div>
                <div className="result_text_title">{item.country}</div>
                <div className="result_text_date">{item.date}</div>
                <div className="result_text_notes">{item.notes}</div>
                <div className="result_text_notes">
                  {item.bunting ? "True" : "False"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainContent;