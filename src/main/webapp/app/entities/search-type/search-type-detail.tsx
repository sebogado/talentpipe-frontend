import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './search-type.reducer';
import { ISearchType } from 'app/shared/model/search-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISearchTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SearchTypeDetail extends React.Component<ISearchTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { searchTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentpipeApp.searchType.detail.title">SearchType</Translate> [<b>{searchTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentpipeApp.searchType.name">Name</Translate>
              </span>
            </dt>
            <dd>{searchTypeEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentpipeApp.searchType.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{searchTypeEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentpipeApp.searchType.description">Description</Translate>
              </span>
            </dt>
            <dd>{searchTypeEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/search-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/search-type/${searchTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ searchType }: IRootState) => ({
  searchTypeEntity: searchType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTypeDetail);
