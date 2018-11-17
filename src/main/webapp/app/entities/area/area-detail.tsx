import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AreaDetail extends React.Component<IAreaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { areaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.area.detail.title">Area</Translate> [<b>{areaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.area.name">Name</Translate>
              </span>
            </dt>
            <dd>{areaEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentPipeFrontendApp.area.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{areaEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentPipeFrontendApp.area.description">Description</Translate>
              </span>
            </dt>
            <dd>{areaEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/area" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/area/${areaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ area }: IRootState) => ({
  areaEntity: area.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaDetail);