const grabCourseSelector = '.base-search-card__info h3';

const grabAuthorSelector = '.base-search-card__info h4';

const grabDateSelector =
    '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section.core-section-container.my-3.certificate-details__completion-date > div > ul > li > span';

const grabTimeSelector =
    '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--content-duration > span';

const grabVideosSelector =
    '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section:nth-child(3) > div > ul > li.certificate-details__content-details-item.certificate-details__content-details-item--videos-count > span';

const grabCategorySelector = '#main-content > section > div.certificate-details__info > div.certificate-details__left-rail > section.core-section-container.my-3.course-skills > div > ul > li > a';

module.exports = {
    grabCourseSelector,
    grabAuthorSelector,
    grabDateSelector,
    grabTimeSelector,
    grabVideosSelector,
    grabCategorySelector,
};
